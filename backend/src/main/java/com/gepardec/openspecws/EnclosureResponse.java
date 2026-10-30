package com.gepardec.openspecws;

import java.util.List;

public record EnclosureResponse(
        String name,
        int animalCount,
        List<EnclosureAnimalResponse> animals
) {
}
