package com.gepardec.openspecws;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertThrows;

@QuarkusTest
class UniqueNameConstraintTest {

    @BeforeEach
    @Transactional
    void deleteAnimals() {
        Animal.deleteAll();
    }

    @Test
    void databaseRejectsDuplicateName() {
        assertThrows(PersistenceException.class, this::persistTwoLeos);
    }

    @Test
    void constraintViolationIsReportedAsConflict() {
        given()
                .when().post("/api/test/duplicate-animal")
                .then()
                .statusCode(409);
    }

    @Transactional
    void persistTwoLeos() {
        newLeo().persistAndFlush();
        newLeo().persistAndFlush();
    }

    static Animal newLeo() {
        Animal animal = new Animal();
        animal.name = "Leo";
        animal.species = "Löwe";
        return animal;
    }
}
