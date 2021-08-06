package org.hive.test;

public class HiveTest {
    public static void main(String[] args) {
        String text = "This notebook can be geeeek used to geek install gek on all geeeek worker nodes, " +
                "run data generation, and create the TPCDS geeeeeeeeek database.";

        String replaceText = text.replaceAll("ge{2,}k\\s","");

        System.out.println(replaceText);
    }
}
