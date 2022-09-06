package com.training.hospital.service.impl;

import com.training.hospital.service.IRedisService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.concurrent.TimeUnit;

/**
 * @author  jk191's group
 * @date 2022/7/21
 */

@Service
public class RedisServiceImpl implements IRedisService {

    @Resource
    private RedisTemplate<String, Object> redisTemplate;

    @Override
    public void set(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }

    @Override
    public void set(String key, Object value, long expire) {
        redisTemplate.opsForValue().set(key, value, expire, TimeUnit.SECONDS);
    }

    @Override
    public Object get(String key) {
        if (hasKey(key)) {
            return redisTemplate.opsForValue().get(key);
        }

        return null;
    }

    /**
     * 删除数据
     *
     * @param key 键值
     */
    @Override
    public boolean remove(String key) {
        return redisTemplate.delete(key);
    }

    /**
     * 自增操作
     *
     * @param key   键值
     * @param delta 自增步长
     * @return 步长数
     */
    @Override
    public Long increment(String key, long delta) {
        return redisTemplate.opsForValue().increment(key, delta);
    }

    /**
     * 自减操作
     *
     * @param key   键值
     * @param delta 自增步长
     * @return 步长数
     */
    @Override
    public Long decrement(String key, long delta) {
        return redisTemplate.opsForValue().decrement(key, delta);
    }

    /**
     * 判断是否存在key
     *
     * @param key 键值
     * @return 是否存在
     */
    @Override
    public boolean hasKey(String key) {
        return redisTemplate.hasKey(key);
    }
}
