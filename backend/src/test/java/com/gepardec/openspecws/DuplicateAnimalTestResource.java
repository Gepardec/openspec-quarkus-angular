package com.gepardec.openspecws;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;

/**
 * Test-only endpoint: bypasses the name check and stores a duplicate,
 * so the real path via transaction interceptor and exception mapper is exercised.
 */
@Path("/test/duplicate-animal")
public class DuplicateAnimalTestResource {

    @POST
    @Transactional
    public void createDuplicate() {
        UniqueNameConstraintTest.newLeo().persistAndFlush();
        UniqueNameConstraintTest.newLeo().persistAndFlush();
    }
}
