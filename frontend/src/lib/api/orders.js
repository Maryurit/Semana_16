const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('No token found in localStorage');
    return {
      'Content-Type': 'application/json'
    };
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const ordersAPI = {
  getMyOrders: async () => {
    try {
      const headers = getAuthHeaders();
      const token = localStorage.getItem('token');
      
      console.log('=== DEBUG ORDERS ===');
      console.log('Token exists:', !!token);
      console.log('Token preview:', token ? token.substring(0, 50) + '...' : 'NO TOKEN');
      console.log('Headers:', headers);
      console.log('==================');
      
      const response = await fetch(`${API_URL}/pedidos`, {
        method: 'GET',
        headers
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        console.error('Orders fetch failed:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        return { success: false, data: [], message: 'No se pudieron cargar los pedidos' };
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return { success: false, data: [], message: error.message };
    }
  },

  getById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/pedidos/${id}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        return { success: false, data: null };
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching order:', error);
      return { success: false, data: null };
    }
  },

  create: async (orderData) => {
    try {
      console.log('Creating order with data:', orderData);
      
      const headers = getAuthHeaders();
      console.log('Request headers present:', {
        hasContentType: !!headers['Content-Type'],
        hasAuth: !!headers['Authorization']
      });
      
      const response = await fetch(`${API_URL}/pedidos`, {
        method: 'POST',
        headers,
        body: JSON.stringify(orderData)
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          message: 'Error del servidor al crear el pedido'
        }));
        
        console.error('Order creation failed:', errorData);
        
        // Mensaje específico para error 500
        if (response.status === 500) {
          return {
            success: false,
            message: 'Error en el servidor. Por favor, contacta al administrador o intenta más tarde.'
          };
        }
        
        return {
          success: false,
          message: errorData.message || 'Error al crear el pedido'
        };
      }
      
      const data = await response.json();
      console.log('Order creation response:', data);
      
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      return { 
        success: false, 
        message: 'Error de conexión al crear el pedido'
      };
    }
  },

  updateStatus: async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/pedidos/${id}/estado`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ estado: status })
      });
      
      if (!response.ok) {
        return { success: false, message: 'Error al actualizar el estado' };
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating order status:', error);
      return { 
        success: false, 
        message: 'Error al actualizar el estado' 
      };
    }
  }
};
