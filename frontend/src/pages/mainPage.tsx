import React, { useState, useEffect } from "react";
import '../styles/mainPage.css';
import { MenuItem, Product } from "../interfaces/interfaces";
import { List, InputNumber, Button, ConfigProvider } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import { useNavigate, useLocation } from 'react-router-dom';




const API_URL = "http://localhost:3000/"


const MainPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('Sanduíches');
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<{ [key: number]: number }>({});
    const [isCartOpen, setIsCartOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as { userId?: number } | null;
    const userId = state?.userId;


    <ConfigProvider
    theme={{
        components:{
            InputNumber:{
                handleBorderColor: '#FFBD14'
            }
        }
    }}
  ></ConfigProvider>

    useEffect(() => {
        fetch(`${API_URL}produtos`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error("Erro ao buscar produtos:", error));
    }, []);

    const menuItems: MenuItem[] = [
        { name: "Sanduíches", img: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kfXJJjT7/200/200/original?country=br" },
        { name: "Acompanhamentos", img: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kUXGZHtB/200/200/original?country=br" },
        { name: "Sobremesas", img: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kpX0NLJ6/200/200/original?country=br" },
        { name: "Bebidas", img: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kNXBvqQj/200/200/original?country=br" },
    ];

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : [];

    const updateQuantity = (productId: number, value: number) => {
        setCart((prev) => {
            const newCart = { ...prev, [productId]: Math.max(0, value) };
            
            if (value > 0) {
                setIsCartOpen(true);
            }
    
            return newCart;
        });
    };

    const handleRemoveFromCart = (productId: number) => {
        setCart((prev) => {
            const newCart = { ...prev };
            delete newCart[productId];
            return newCart;
        });

    };

    const finalizePurchase = () => {
        navigate("/payment", { state: { cart, userId } });
    };


    return (
        <ConfigProvider
            theme={{
                components: {
                    InputNumber: {
                        hoverBorderColor: '#FFBD14',
                        activeBorderColor: '#FFBD14'
                    },
                    List:{
                        itemPadding: '12px 12px',
                    }
                },
            }}
        >
        <div className="container">
            <aside className="sidebar">
                <nav>
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            className={`menu-item ${selectedCategory === item.name ? "active" : ""}`}
                            onClick={() => setSelectedCategory(item.name)}
                        >
                            <img src={item.img} alt={item.name} className="menu-img" />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </nav>
            </aside>
            <div className="content">
                <h2>{selectedCategory || "Selecione uma categoria"}</h2>
                <List
                    dataSource={filteredProducts}
                    renderItem={(product: Product) => (
                        <List.Item className="product-list-item">
                            <img src={product.image_url} alt={product.name} className="product-img" />

                            <div className="product-details">
                                <h3>{product.name}</h3>
                                <p>R$ {product.price}</p>
                            </div>
                            <div className="product-controls">
                                <Button
                                    onClick={() => updateQuantity(product.id, (cart[product.id] || 0) - 1)}
                                    variant="outlined"
                                    disabled={(cart[product.id] || 0) <= 0}
                                    color="gold">
                                    -
                                </Button>
                                <InputNumber
                                    min={0}
                                    value={cart[product.id] || 0}
                                    onChange={(value: number | null) => updateQuantity(product.id, value ?? 0)}
                                    controls={false}
                                />
                                <Button 
                                    onClick={() => updateQuantity(product.id, (cart[product.id] || 0) + 1)}
                                    variant="outlined"
                                    color="gold">
                                    +
                                </Button>
                            </div>
                        </List.Item>
                        
                    )}
                />
            </div>
            {isCartOpen && (
                <div className="cart-sidebar">
                    <h3 style={{ display: 'flex', alignItems: 'center' }}>
                        Carrinho
                        <ShoppingCartOutlined style={{ fontSize: '24px', marginLeft: '5px' }} />
                    </h3>
                    <List
                        dataSource={Object.keys(cart)}  
                        renderItem={(productId) => {
                            const product = products.find(p => p.id === parseInt(productId));
                            const quantity = cart[parseInt(productId)];

                            return (
                                product && (
                                    <List.Item key={product.id} className="cart-item">
                                        <span>{product.name} - R$ {product.price} x {quantity}</span>
                                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                                            <Button 
                                                color="danger" 
                                                variant="outlined"
                                                icon={<DeleteOutlined twoToneColor="#ff4d4f" />} 
                                                size="small" 
                                                onClick={() => handleRemoveFromCart(product.id)} 
                                            />
                                        </div>
                                    </List.Item>
                                )
                            );
                        }}
                    />

                    <h3 style={{ marginTop: "10px", textAlign: "center" }}>
                        Total: R$ {Object.keys(cart).reduce((total, productId) => {
                            const product = products.find(p => p.id === parseInt(productId));
                            const price = parseFloat(product?.price ?? "0"); // Converte price para número
                            const quantity = cart[parseInt(productId)] ?? 0; // Garante que quantity seja um número
                            return total + price * quantity;
                        }, 0).toFixed(2)}
                    </h3>


                    <Button onClick={finalizePurchase}>Finalizar Compra</Button>

                </div>
            )}
        </div>
    </ConfigProvider>
    );
};

export default MainPage;