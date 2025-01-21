package openerp.openerpresourceserver.service;
import openerp.openerpresourceserver.response.AddressResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AddressSuggestionServiceImpl implements AddressSuggestionService {

    private final RestTemplate restTemplate = new RestTemplate();

    private static final String NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

    @Override
    public List<String> getSuggestions(String query) {
        String url = UriComponentsBuilder.fromHttpUrl(NOMINATIM_URL)
                .queryParam("q", query)
                .queryParam("format", "json")
                .queryParam("addressdetails", 1)
                .queryParam("limit", 5)
                .toUriString();

        try {
            AddressResponse[] response = restTemplate.getForObject(url, AddressResponse[].class);

            if (response != null) {
                return List.of(response).stream()
                        .map(AddressResponse::getDisplay_name)
                        .collect(Collectors.toList());
            }
        } catch (Exception e) {
            // Log lỗi và trả về danh sách rỗng
            System.err.println("Error fetching suggestions: " + e.getMessage());
        }

        return List.of();
    }
}
