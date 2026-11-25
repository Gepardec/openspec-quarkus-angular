package com.gepardec.openspecws;

import jakarta.persistence.PersistenceException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import org.hibernate.exception.ConstraintViolationException;

/**
 * Maps a violated database constraint (today only the unique animal name) to 409 Conflict.
 * Any other persistence error stays a 500.
 */
@Provider
public class PersistenceConflictMapper implements ExceptionMapper<PersistenceException> {

    @Override
    public Response toResponse(PersistenceException exception) {
        for (Throwable cause = exception; cause != null; cause = cause.getCause()) {
            if (cause instanceof ConstraintViolationException) {
                return Response.status(Response.Status.CONFLICT).build();
            }
        }
        return Response.serverError().build();
    }
}
