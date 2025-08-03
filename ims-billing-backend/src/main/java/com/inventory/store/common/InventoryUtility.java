package com.inventory.store.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Slf4j
public class InventoryUtility {

    static public String convertObjectToJson(List objects) {
        // Convert ArrayList to JSON string
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String jsonString
                    = objectMapper.writeValueAsString(objects);
            System.out.println(jsonString);
            log.debug(jsonString);
            return jsonString;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;

    }
}
