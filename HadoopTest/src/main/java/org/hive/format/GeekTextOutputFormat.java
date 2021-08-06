package org.hive.format;

import java.io.IOException;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.hive.ql.exec.FileSinkOperator.RecordWriter;
import org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat;
import org.apache.hadoop.hive.ql.io.HiveOutputFormat;
import org.apache.hadoop.io.BytesWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.Writable;
import org.apache.hadoop.io.WritableComparable;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hadoop.util.Progressable;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class GeekTextOutputFormat<K extends WritableComparable, V extends Writable> extends HiveIgnoreKeyTextOutputFormat<K, V> {

    @Override
    public RecordWriter getHiveRecordWriter(JobConf jc, Path outPath, Class<? extends Writable> valueClass, boolean isCompressed, Properties tableProperties, Progressable progress) throws IOException {
        GeekTextOutputFormat.GeekRecordWriter writer = new GeekTextOutputFormat.GeekRecordWriter(super.getHiveRecordWriter(jc, outPath, BytesWritable.class, isCompressed, tableProperties, progress));
        return writer;
    }

    public static class GeekRecordWriter implements RecordWriter{

        RecordWriter writer;
        Text text;

        public GeekRecordWriter(RecordWriter writer) {
            this.writer = writer;
            this.text = new Text();
        }

        @Override
        public void write(Writable writable) throws IOException {
            /**
             * 加密规则的逻辑实现
             */
            String geekStr = writable.toString();
            String[] array =  geekStr.split("\\s");

            List<Integer> list = splitSentence(array.length);
            int position = 0;
            for(int i:list){
                position = position + i;
                if(array.length>=position && position>=1){
                    array[position-1] = array[position-1] + repeatStr(i);
                }
            }
            this.text.set(StringUtils.join(array," "));
            this.writer.write(this.text);
        }

        @Override
        public void close(boolean b) throws IOException {
            this.writer.close(b);
        }
    }

    /**
     * 找到插入单词的位置
     * @param n  句子单词的个数
     * @return
     */
    public static List<Integer> splitSentence(int n){
        List<Integer> list = new ArrayList<>();
        int random = new Random().nextInt(5) +2;
        int flag = n - random;
        while (flag > 0){
            list.add(random);
            random = new Random().nextInt(5) +2;
            flag = flag - random;
        }
        return list;
    }

    /**
     * 插入相应的单词
     * @param num 字母重复次数
     * @return
     */
    public static String repeatStr(int num){
        return " g"+ StringUtils.repeat("e",num)+"k";
    }
}
