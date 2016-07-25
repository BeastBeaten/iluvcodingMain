package com.openwebv2.app.util.uuid;

/**
 * <p></p>
 *
 * @version 1.0
 */
public class UIDNotSupportException extends ClassNotFoundException {
    /**
     * Constructor for the UIDNotSupportException object
     *
     * @param s Description of the Parameter
     */
    public UIDNotSupportException(String s) {
        super(s, null);

        //  Disallow initCause
    }
}
