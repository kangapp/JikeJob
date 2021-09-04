package spark

import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.catalyst.expressions.{And, Attribute, ExpressionSet, GreaterThan, Literal, PredicateHelper}
import org.apache.spark.sql.catalyst.plans.logical.{Filter, LogicalPlan}
import org.apache.spark.sql.catalyst.rules.Rule

/**
 * 自定义Filter合并规则  参考CombineFilter的实现
 * 简单实现  合并同一个属性值存在多个大于等情况
 * 例如：age > 10 and age > 20  合并成    age > 10
 *
 * @param spark
 */
case class MyCombineFilter(spark: SparkSession) extends Rule[LogicalPlan] with PredicateHelper {
  def apply(plan: LogicalPlan): LogicalPlan = plan transformDown {
    /**
     * 只处理Filter
     */
    case Filter(fc, child) =>

      /**
       * 将过滤条件按 and 进行拆分，引用CombineFilters里面的splitConjunctivePredicates方法
       */
      val expressions = ExpressionSet(splitConjunctivePredicates(fc))
      /**
       * GreaterThan(left: Expression, right: Expression)
       * 按属性值进行分组，并取出right值最小的GreaterThan
       */
      val greaterThan = expressions.filter(_.isInstanceOf[GreaterThan])
        .groupBy(_.asInstanceOf[GreaterThan].left.asInstanceOf[Attribute].name)
        .map { item =>
          item._2.minBy(_.asInstanceOf[GreaterThan].
            right.asInstanceOf[Literal].value.toString).asInstanceOf[GreaterThan]
        }
      /**
       * 先过滤掉Filter中所有的GreaterThan
       * 再加上上面计算好的GreaterThan
       */
      val result_expressions = expressions.filter {
        case expression: GreaterThan => false
        case _ => true
      } ++ greaterThan

      /**
       * 把拆分的过滤条件通过 and 再次连接起来
       */
      result_expressions.reduceOption(And) match {
        case Some(ac) =>
          Filter(ac, child)
        case None =>
          Filter(fc, child)
      }
  }
}
