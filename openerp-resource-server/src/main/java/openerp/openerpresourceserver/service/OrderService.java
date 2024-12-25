package openerp.openerpresourceserver.service;

import openerp.openerpresourceserver.controller.entity.Order;
import openerp.openerpresourceserver.dto.OrderDTO;
import openerp.openerpresourceserver.response.OrderResponse;

import java.util.List;

public interface OrderService {
    List<OrderResponse> getAllOrders();

    Order addOrder(OrderDTO order);
}
