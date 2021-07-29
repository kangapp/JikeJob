package org.mapreduce.function;

import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.mapreduce.bean.FlowBean;

import java.io.IOException;

public class FlowMapper extends Mapper<LongWritable, Text, Text, FlowBean> {

    @Override
    protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
        String[] values = value.toString().split("\t");
        long upFlow = Long.parseLong(values[values.length-3]);
        long downFlow = Long.parseLong(values[values.length-2]);
        context.write(new Text(values[1]), new FlowBean(upFlow,downFlow));
    }
}
