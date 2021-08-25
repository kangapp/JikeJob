package spark

import org.apache.commons.cli.{CommandLine, CommandLineParser, DefaultParser, Options}
import org.apache.hadoop.fs.{FileUtil, Path}
import org.apache.spark.sql.SparkSession
import org.hadoop.HdfsUtil

object SparkDistcpApp {

  def main(args: Array[String]): Unit = {

    /**
     * 传入source 和 target
     * 参数解析 -m  -i
     */
    val path_s = args(args.length - 2)
    val path_t = args(args.length - 1)
    val commandLine = parserArgs(args)
    var taskNum:Int = 2
    var ignore:Boolean = false
    if(commandLine.hasOption("m")){
      taskNum = commandLine.getOptionValue("m").toInt
    }
    ignore = commandLine.hasOption("i")

    val spark = SparkSession
      .builder
      .appName("SparkDistcpApp")
      .master("local")
      .getOrCreate()

    import collection.JavaConverters._
    /**
     * 获取目录文件列表
     */
    val list = scala.collection.mutable.ListBuffer[String]()
    HdfsUtil.checkDirectories(path_s,path_t,list.asJava)

    /**
     * 复制目录文件到目标目录
     */
    val rdd = spark.sparkContext.parallelize(list,taskNum)
    rdd.foreachPartition(row => {
      val fileSystem = HdfsUtil.getFileSystem
      row.foreach(item => {
        val targetPath = path_t + item.split(path_s)(1)
        FileUtil.copy(fileSystem,new Path(item),fileSystem,new Path(targetPath),false,fileSystem.getConf)
      })
    })
  }
  def parserArgs(args: Array[String]):CommandLine = {
    val option:Options = new Options
    option.addOption("m",true,"max concurrence")
    option.addOption("i",false,"Ignore failures")
    val commandLineParser:CommandLineParser = new DefaultParser
    commandLineParser.parse(option, args)
  }
}
