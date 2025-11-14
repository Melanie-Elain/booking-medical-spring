package  com.booking.medical_booking.config;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.io.IOException;
import java.util.List;

@Converter
public class StringListConverter implements AttributeConverter<List<String>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    // Chuyển từ List<String> (Java) sang String (Database)
    @Override
    public String convertToDatabaseColumn(List<String> attribute) {
        if (attribute == null || attribute.isEmpty()) {
            return null;
        }
        try {
            // Chuyển List thành chuỗi JSON
            return objectMapper.writeValueAsString(attribute); 
        } catch (IOException e) {
            // Xử lý lỗi serialization
            throw new RuntimeException("Lỗi chuyển List<String> sang JSON", e);
        }
    }

    // Chuyển từ String (Database) sang List<String> (Java)
    @Override
    public List<String> convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }
        try {
            // Chuyển chuỗi JSON thành List
            return objectMapper.readValue(dbData, new TypeReference<List<String>>() {});
        } catch (IOException e) {
            // Xử lý lỗi deserialization
            throw new RuntimeException("Lỗi chuyển JSON sang List<String>", e);
        }
    }
}