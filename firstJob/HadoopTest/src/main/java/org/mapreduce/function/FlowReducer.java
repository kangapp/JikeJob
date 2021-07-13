package org.mapreduce.function;

import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import org.mapreduce.bean.FlowBean;

import java.io.IOException;

public class FlowReducer extends Reducer<Text, FlowBean, Text, FlowBean> {

    @Override
    protected void reduce(Text key, Iterable<FlowBean> values, Context context) throws IOException, InterruptedException {

        long upFlowSum = 0;
        long downFlowSum = 0;

        for(FlowBean item : values) {
            long upFlow = item.getUpFlow();
            long downFlow = item.getDownFlow();

            upFlowSum = upFlowSum + upFlow;
            downFlowSum =downFlowSum + downFlow;
        }

        context.write(key, new FlowBean(upFlowSum,downFlowSum));
    }
}
