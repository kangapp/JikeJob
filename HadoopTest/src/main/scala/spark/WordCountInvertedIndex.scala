package spark

import org.apache.spark.sql.SparkSession

object WordCountInvertedIndex {
  def main(args: Array[String]): Unit = {
    if (args.length < 1) {
      System.err.println("Usage: WordCountInvertedIndex <file>")
      System.exit(1)
    }
    val spark = SparkSession
      .builder
      .appName("WordCountInvertedIndex")
      .master("local")
      .getOrCreate()

    /**
     * wholeTextFiles()读取目录,（filename,text）
     */
    val file = spark.sparkContext.wholeTextFiles(args(0))

     // 文件分词,（word,path）
    val result = file.flatMap(item => item._2.replaceAll("\n", " ").split(" ")
      .map(word => (word, item._1.substring(1 + item._1.lastIndexOf("/")))))
      // 按(word,path)分组计算词频  ((word,path),num)
      .map(item => (item, 1)).reduceByKey(_ + _)
      // 简单转换  (word,(path,num))
      .map(item => (item._1._1, (item._1._2, item._2)))
      // 按要求输出
      .groupByKey().map(item => {
      "\"" + item._1 + "\": " + "{" + item._2.mkString(",") + "}"
    })
    result.collect.foreach(println)
    spark.stop()
  }
}
