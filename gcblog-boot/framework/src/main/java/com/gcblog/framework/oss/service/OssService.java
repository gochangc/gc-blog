package com.gcblog.framework.oss.service;

// 对象存储服务接口
public interface OssService {
    String upload(byte[] data, String fileName);
    void delete(String fileUrl);
}
