package com.openwebv2.app.util.uuid;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

/**
 * <p></p>
 *
 * @version 1.0
 */
public class UUIDGener {
    	private static UIDFactory uuid = null;

	static {
		try {
			uuid = UIDFactory.getInstance("UUID");
		}
		catch (UIDNotSupportException unsex) {
		}

		;
	}

	/**Constructor for the UUIDGener object */
	public UUIDGener() {
	}

	public static String getUUID() {
		return uuid.getNextUID();
	}

}
