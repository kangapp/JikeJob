package spark

import org.apache.spark.sql.SparkSessionExtensions

/**
 * 自定义优化规则
 */
class MySparkSessionExtension extends (SparkSessionExtensions => Unit){
  override def apply(v1: SparkSessionExtensions): Unit = {
    v1.injectOptimizerRule(session =>{
      MyCombineFilter(session)
    })
  }
}
