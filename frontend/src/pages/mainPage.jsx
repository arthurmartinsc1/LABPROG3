import React, { useState } from "react";
import '../styles/mainPage.css';
function MainPage(){
    const [selectedCategory, setSelectedCategory] = useState(null);
    return(
        <div className="container">
            <aside className="sidebar">
                <nav>
                    {[
                    { name: "Hambúrgueres", img: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kfXJJjT7/200/200/original?country=br" },
                    { name: "Acompanhamentos", img: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kUXGZHtB/200/200/original?country=br" },
                    { name: "Sobremesas", img: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kpX0NLJ6/200/200/original?country=br" },
                    { name: "Bebidas", img: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kNXBvqQj/200/200/original?country=br" },
                    ].map((item, index) => (
                    <div key={index} className={`menu-item ${selectedCategory === item.name ? "active" : ""}`} onClick={() => setSelectedCategory(item.name)}>
                        <img src={item.img} alt={item.name} className="menu-img" />
                        <span>{item.name}</span>
                    </div>
                    ))}
                </nav>
            </aside>
            <div className="content">
                <h2>{selectedCategory || "Selecione uma categoria"}</h2>
            </div>
        </div>
    );
}

export default MainPage;