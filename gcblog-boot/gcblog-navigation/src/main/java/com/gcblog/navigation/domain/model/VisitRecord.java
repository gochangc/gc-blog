package com.gcblog.navigation.domain.model;

import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Table("tb_visit_record")
public class VisitRecord {
    @Id(keyType = KeyType.Auto)
    private Long id;
    private Long linkId;
    private String ip;
    private LocalDateTime visitTime;
}
