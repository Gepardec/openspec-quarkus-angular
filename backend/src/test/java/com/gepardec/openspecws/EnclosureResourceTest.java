package com.gepardec.openspecws;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.everyItem;
import static org.hamcrest.Matchers.not;

@QuarkusTest
class EnclosureResourceTest {

    @BeforeEach
    @Transactional
    void deleteAnimals() {
        Animal.deleteAll();
    }

    @Test
    void listEnclosuresGroupsAnimalsOfTheSameEnclosure() {
        long majaId = persistAnimal("Maja", "Löwe", "Savanne");
        long zaraId = persistAnimal("Zara", "Zebra", "Savanne");

        given()
                .when().get("/api/enclosures")
                .then()
                .statusCode(200)
                .body("size()", is(1))
                .body("[0].name", is("Savanne"))
                .body("[0].animalCount", is(2))
                .body("[0].animals.id", containsInAnyOrder((int) majaId, (int) zaraId))
                .body("[0].animals.name", containsInAnyOrder("Maja", "Zara"))
                .body("[0].animals.species", containsInAnyOrder("Löwe", "Zebra"));
    }

    @Test
    void listEnclosuresSortsEnclosuresAndAnimalsByName() {
        persistAnimal("Zara", "Zebra", "Savanne");
        persistAnimal("Ellie", "Elefant", "Afrika-Haus");
        persistAnimal("Maja", "Löwe", "Savanne");

        given()
                .when().get("/api/enclosures")
                .then()
                .statusCode(200)
                .body("name", contains("Afrika-Haus", "Savanne"))
                .body("[1].animals.name", contains("Maja", "Zara"));
    }

    @Test
    void listEnclosuresReturnsEmptyArrayWhenNoEnclosureIsOccupied() {
        persistAnimal("Nemo", "Clownfisch", null);

        given()
                .when().get("/api/enclosures")
                .then()
                .statusCode(200)
                .body("", empty());
    }

    @Test
    void listEnclosuresOmitsAnimalsWithoutOrWithBlankEnclosure() {
        persistAnimal("Leo", "Löwe", "Savanne");
        persistAnimal("Nemo", "Clownfisch", null);
        persistAnimal("Buddy", "Pinguin", "");
        persistAnimal("Kira", "Giraffe", "   ");

        given()
                .when().get("/api/enclosures")
                .then()
                .statusCode(200)
                .body("size()", is(1))
                .body("name", contains("Savanne"))
                .body("[0].animalCount", is(1))
                .body("[0].animals.name", contains("Leo"))
                .body("name", everyItem(not(is(""))));
    }

    @Transactional
    long persistAnimal(String name, String species, String enclosure) {
        Animal animal = new Animal();
        animal.name = name;
        animal.species = species;
        animal.enclosure = enclosure;
        animal.persist();
        return animal.id;
    }
}
