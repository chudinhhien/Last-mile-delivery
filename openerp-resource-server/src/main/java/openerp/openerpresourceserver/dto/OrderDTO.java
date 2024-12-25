package openerp.openerpresourceserver.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
public class OrderDTO {
    private UUID id;
    private UUID customerId;
    private String status;
    private BigDecimal weight;
    private BigDecimal volumn;
}
