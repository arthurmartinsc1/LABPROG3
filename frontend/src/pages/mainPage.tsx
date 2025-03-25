import React, { useState, useEffect } from "react";
import '../styles/mainPage.css';
import { MenuItem, Product } from "../interfaces/interfaces";
import { List, InputNumber, Button } from "antd";

const API_URL = "http://localhost:3000/"

const MainPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('Sanduíches');
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<{ [key: number]: number }>({});

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
        setCart((prev) => ({
            ...prev,
            [productId]: Math.max(0, value),
        }));
    };

    return (
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
                                    disabled={(cart[product.id] || 0) <= 0}
                                >
                                    -
                                </Button>
                                <InputNumber
                                    min={0}
                                    value={cart[product.id] || 0}
                                    onChange={(value: number | null) => updateQuantity(product.id, value ?? 0)}
                                />
                                <Button onClick={() => updateQuantity(product.id, (cart[product.id] || 0) + 1)}>
                                    +
                                </Button>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default MainPage;
