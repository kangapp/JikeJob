package org.hbase.job;

import org.apache.hadoop.hbase.client.Put;
import org.apache.hadoop.hbase.client.ResultScanner;
import org.apache.hadoop.hbase.util.Bytes;
import org.hbase.util.HBaseUtil;

import java.util.ArrayList;
import java.util.List;

public class HBaseApp {
    public static void main(String[] args) {

        String tableName = "liufukang:student";
        /**
         * 删除表
         */
        HBaseUtil.deleteTable(tableName);

        /**
         * 建表：liufukang:student
         * 列族：info、score
         */
        String[] cf = new String[]{"info","score"};
        boolean createFlag = HBaseUtil.createTable(tableName,cf);
        System.out.println(tableName+"创建"+(createFlag?"成功":"失败"));

        /**
         * 批量插入数据
         */
        List<Put> puts = new ArrayList<Put>(){{
            add(new Put(Bytes.toBytes("Tom"))
                    .addColumn(Bytes.toBytes("info"), Bytes.toBytes("student_id"), Bytes.toBytes("20210000000001"))
                    .addColumn(Bytes.toBytes("info"), Bytes.toBytes("class"), Bytes.toBytes("1"))
                    .addColumn(Bytes.toBytes("score"), Bytes.toBytes("understanding"), Bytes.toBytes("75"))
                    .addColumn(Bytes.toBytes("score"), Bytes.toBytes("programming"), Bytes.toBytes("82")));
            add(new Put(Bytes.toBytes("Jerry"))
                    .addColumn(Bytes.toBytes("info"), Bytes.toBytes("student_id"), Bytes.toBytes("20210000000002"))
                    .addColumn(Bytes.toBytes("info"), Bytes.toBytes("class"), Bytes.toBytes("1"))
                    .addColumn(Bytes.toBytes("score"), Bytes.toBytes("understanding"), Bytes.toBytes("85"))
                    .addColumn(Bytes.toBytes("score"), Bytes.toBytes("programming"), Bytes.toBytes("67")));
        }};
        boolean putsFlag = HBaseUtil.putRows(tableName,puts);
        System.out.println("批量插入数据"+(putsFlag?"成功":"失败"));

        /**
         * 插入个人信息数据
         */
        boolean putFlag =
                HBaseUtil.putRow(tableName,"liufukang","info","student_id","G20210735010339")&&
                HBaseUtil.putRow(tableName,"liufukang","info","class","4")&&
                HBaseUtil.putRow(tableName,"liufukang","score","understanding","99")&&
                HBaseUtil.putRow(tableName,"liufukang","score","programming","99");
        System.out.println("插入个人信息数据"+(putFlag?"成功":"失败"));

        /**
         * 删除数据
         */
        boolean delFlag = HBaseUtil.deleteRow(tableName,"Tom");
        System.out.println("数据删除"+(delFlag?"成功":"失败"));

        /**
         * 读取数据
         */
        ResultScanner scanner = HBaseUtil.getScannner(tableName);
        if(scanner != null) {
            System.out.println("打印表数据：");
            scanner.forEach(result -> {
                System.out.println("姓名:" + Bytes.toString(result.getRow()));
                System.out.println("学号："+ Bytes.toString(result.getValue(Bytes.toBytes("info"), Bytes.toBytes("student_id"))));
                System.out.println("班级："+ Bytes.toString(result.getValue(Bytes.toBytes("info"), Bytes.toBytes("class"))));
                System.out.println("理解分："+ Bytes.toString(result.getValue(Bytes.toBytes("score"), Bytes.toBytes("understanding"))));
                System.out.println("编码分："+ Bytes.toString(result.getValue(Bytes.toBytes("score"), Bytes.toBytes("programming"))));
                System.out.println("-----------");
            });
        }
        scanner.close();

    }
}
