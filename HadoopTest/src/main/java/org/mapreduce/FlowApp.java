package org.mapreduce;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.mapreduce.bean.FlowBean;
import org.mapreduce.function.FlowMapper;
import org.mapreduce.function.FlowReducer;

import java.net.URI;


public class FlowApp {
    public static void main(String[] args) throws Exception{
        System.setProperty("HADOOP_USER_NAME", "student");
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "liufukang");
        job.setJarByClass(FlowApp.class);
        job.setMapperClass(FlowMapper.class);
        job.setReducerClass(FlowReducer.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(FlowBean.class);
        job.setNumReduceTasks(1);

        FileSystem fileSystem = FileSystem.get(new URI("hdfs://47.101.206.249:8020"), conf, "student");
        Path outputPath = new Path("/user/student/liufukang/output");
        if(fileSystem.exists(outputPath)) {
            fileSystem.delete(outputPath, true);
        }

        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));

        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}
