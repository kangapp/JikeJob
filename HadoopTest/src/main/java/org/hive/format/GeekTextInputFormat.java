package org.hive.format;

import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.*;

import java.io.IOException;

public class GeekTextInputFormat extends TextInputFormat {

    @Override
    public RecordReader<LongWritable, Text> getRecordReader(InputSplit genericSplit, JobConf job, Reporter reporter) throws IOException {
        reporter.setStatus(genericSplit.toString());
        GeekLineRecordReader reader = new GeekLineRecordReader(new LineRecordReader(job, (FileSplit)genericSplit));
        return reader;
    }

    public static class GeekLineRecordReader implements RecordReader<LongWritable, Text> {

        LineRecordReader reader;
        Text text;

        public GeekLineRecordReader(LineRecordReader reader) {
            this.reader = reader;
            this.text = reader.createValue();
        }

        @Override
        public boolean next(LongWritable key, Text value) throws IOException {
            if (!this.reader.next(key, this.text)) {
                return false;
            }
            else {
                /**
                 * 解密规则的逻辑实现
                 */
                String getStr = text.toString().replaceAll("ge{2,}k\\s","");
                Text text = new Text();
                text.set(getStr);
                value.set(text.getBytes(), 0, text.getLength());
                return true;
            }
        }

        @Override
        public LongWritable createKey() {
            return this.reader.createKey();
        }

        @Override
        public Text createValue() {
            return new Text();
        }

        @Override
        public long getPos() throws IOException {
            return this.reader.getPos();
        }

        @Override
        public void close() throws IOException {
            this.reader.close();
        }

        @Override
        public float getProgress() throws IOException {
            return this.reader.getProgress();
        }
    }
}
