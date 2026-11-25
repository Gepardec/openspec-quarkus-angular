package com.gepardec.openspecws;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "animals")
public class Animal extends PanacheEntity {
    @NotBlank
    @Column(unique = true)
    public String name;
    @NotBlank
    public String species;
    public Integer age;
    public String enclosure;
    @Column(name = "fun_fact")
    public String funFact;

    public static boolean existsByName(String name, Long excludeId) {
        if (excludeId == null) {
            return count("name", name) > 0;
        }
        return count("name = ?1 and id <> ?2", name, excludeId) > 0;
    }
}
