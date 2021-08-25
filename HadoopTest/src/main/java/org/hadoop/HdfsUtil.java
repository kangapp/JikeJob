package org.hadoop;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.*;

import java.net.URI;
import java.util.List;

public class HdfsUtil {

    public static final String HDFS_PATH = "hdfs://10.211.55.100:9000";
    public static FileSystem fileSystem = null;
    public static Configuration configuration = null;

    static {
        try {
            configuration = new Configuration();
            fileSystem = FileSystem.get(new URI(HDFS_PATH), configuration, "parallels");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 递归生成目录
     * @param input  source目录
     * @param output    target目录
     * @param list      文件列表
     * @return
     * @throws Exception
     */
    public static List<String> checkDirectories(String input, String output, List<String> list) throws Exception{
        FileStatus[] statuses = fileSystem.listStatus(new Path(input));
        for(FileStatus file : statuses){
            if(file.isDirectory()){
                String path = file.getPath().toString().split(input)[1];
                String sub_path_s = input + path;
                String sub_path_t = output + path;
                fileSystem.mkdirs(new Path(sub_path_t));
                checkDirectories(sub_path_s,sub_path_t,list);
            }
            else{
                String name = file.getPath().toString().split(input)[1];
                String sub_name = input + name;
                list.add(sub_name);
            }
        }
        return list;
    }

    public static FileSystem getFileSystem(){
        return fileSystem;
    }
}
