package com.gepardec.openspecws;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Path("/enclosures")
@Produces(MediaType.APPLICATION_JSON)
public class EnclosureResource {

    @GET
    public List<EnclosureResponse> listEnclosures() {
        List<Animal> animals = Animal.list(
                "enclosure is not null and trim(enclosure) <> '' order by enclosure, name");

        Map<String, List<EnclosureAnimalResponse>> animalsByEnclosure = new LinkedHashMap<>();
        for (Animal animal : animals) {
            animalsByEnclosure
                    .computeIfAbsent(animal.enclosure, enclosure -> new ArrayList<>())
                    .add(new EnclosureAnimalResponse(animal.id, animal.name, animal.species));
        }

        return animalsByEnclosure.entrySet().stream()
                .map(entry -> new EnclosureResponse(entry.getKey(), entry.getValue().size(), entry.getValue()))
                .toList();
    }
}
