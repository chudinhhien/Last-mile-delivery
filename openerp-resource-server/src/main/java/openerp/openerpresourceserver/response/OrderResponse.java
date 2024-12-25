package openerp.openerpresourceserver.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
public class OrderResponse {
    private UUID id;
    private UUID customerId;
    private String customerName;
    private String status;
    private BigDecimal weight;
    private BigDecimal volumn;
}
