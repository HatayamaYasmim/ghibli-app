import React, { useEffect, useState } from 'react';
import './assets/ghibli.css';


const imageMap = {
    "58611129-2dbc-4a81-a72f-77ddfc1b1b49": "/assets/totoro.jpg",
    "2baf70d1-42bb-4437-b551-e5fed5a87abe": "/assets/castle.jpg",
    "12cfb892-aac0-4c5b-94af-521852e46d6a": "/assets/fireflies.jpg",
    "ea660b10-85c4-4ae3-8a5f-41cea3648e3e": "/assets/kiki.jpg",
    "4e236f34-b981-41c3-8c65-f8c9000b94e7": "/assets/yesterday.jpg",
    "ebbb6b7c-945c-41ee-a792-de0e43191bd8": "/assets/porcorusso.jpg",
    "1b67aa9a-2e4a-45af-ac98-64d6ad15b16c": "/assets/pompoko.jpg",
    "ff24da26-a969-4f0e-ba1e-a122ead6c6e3": "/assets/WhisperoftheHeart.jpg",
    "0440483e-ca0e-4120-8c50-4c8cd9b965d6": "/assets/mononoke.jpg",
    "45204234-adfd-45cb-a505-a8e7a676b114": "/assets/MyNeighborstheYamadas.jpg",
    "dc2e6bd1-8156-4886-adff-b39e6043af0c": "/assets/SpiritedAway.jpg",
    "90b72513-afd4-4570-84de-a56c312fdf81": "/assets/TheCatReturns.jpg",
    "cd3d059c-09f4-4ff3-8d63-bc765a5184fa": "/assets/HowlsMovingCastle.jpg",
    "112c1e67-726f-40b1-ac17-6974127bb9b9": "/assets/TalesfromEarthsea.jpg",
    "758bf02e-3122-46e0-884e-67cf83df1786": "/assets/Ponyo.jpg",
    "2de9426b-914a-4a06-a3a0-5e6d9d3886f6": "/assets/Arrietty.jpg",
    "45db04e4-304a-4933-9823-33f389e8d74d": "/assets/FromUponPoppyHill.jpg",
    "67405111-37a5-438f-81cc-4666af60c800": "/assets/TheWindRises.jpg",
    "578ae244-7750-4d9f-867b-f3cd3d6fecf4": "/assets/PrincessKaguya.jpg",
    "5fdfb320-2a02-49a7-94ff-5ca418cae602": "/assets/Marnie.jpg",
    "d868e6ec-c44a-405b-8fa6-f7f0f8cfb500": "/assets/TheRedTurtle.jpg",
    "790e0028-a31c-4626-a694-86b7a8cada40": "/assets/Earwig.jpg"
};

const Ghibli = () => {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let url = 'https://ghibliapi.vercel.app/films';
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setFilmes(data);
                setLoading(false);
            })

            .catch((error) => {
                console.log("Erro ao buscar dados: ", error);
                setLoading(false);
            });
    }, []);


    const nextSlide = () => {
        setCurrentIndex((prev) => {
            const newIndex = prev + visibleSlides;
            return newIndex >= filmes.length ? 0 : newIndex;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => {
            const newIndex = prev - visibleSlides;
            return newIndex < 0 ? filmes.length - visibleSlides : newIndex;
        });
    };

    const visibleSlides = 4;
    const totalPages = Math.ceil(filmes.length / visibleSlides);

    return (
        <div className='m-4 relative'>
            {loading ? (<p>Carregando...</p>) : (
                <div className='relative overflow-hidden h-auto'>

                    <div className='flex transition-transform duration-500'
                        style={{
                            transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
                        }}
                    >
                        {filmes.map((filme) => (
                            <div
                                key={filme.id}
                                className="flex-shrink-0 p-4"
                                style={{
                                    width: `${100 / visibleSlides}%`,
                                }}
                                onMouseEnter={() => setHoveredCard(filme.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div className={`relative w-[20vw] h-[50vh] p-5 rounded-lg shadow-lg transition-transform 
                                duration-500 ease-in-out hover:scale-105 hover:shadow-xl ${hoveredCard && hoveredCard !== filme.id ? 'blur-sm opacity-50' : 'blur-none opacity-100'
                                    }`}
                                    onMouseEnter={() => setHoveredCard(filme.id)}
                                    onMouseLeave={() => setHoveredCard(null)} >
                                    {hoveredCard === filme.id ? (
                                        <div className="absolute inset-0 bg-gradient-to-t bg-sky-50 rounded-xl p-4 shadow-xl overflow-y-auto">
                                            <h2 className="text-xl font-bold">{filme.title}</h2>
                                            <h2>{filme.original_title}</h2>
                                            <p>
                                                <strong>Diretor:</strong> {filme.director}
                                            </p>
                                            <p>
                                                <strong>Produtor:</strong> {filme.producer}
                                            </p>
                                            <p>
                                                <strong>Lançamento:</strong> {filme.release_date}
                                            </p>
                                            <p className="text-justify">{filme.description}</p>
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0">
                                            {imageMap[filme.id] ? (
                                                <img
                                                    src={imageMap[filme.id]}
                                                    alt={filme.title}
                                                    className="w-full h-full object-cover rounded-xl"
                                                />
                                            ) : (
                                                <p className="text-center">Imagem não disponível</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={prevSlide} className='absolute top-1/2 left-2 transform -translate-y-1/2 bg-sky-400 text-white p-2 rounded-full shadow-md hover:bg-blue-400 opacity-50'> &#8250;</button>
                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-sky-400 text-white p-2 rounded-full shadow-md hover:bg-blue-400 opacity-50"
                    >
                        &#8250;
                    </button>

                    {/* Indicadores */}
                    {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full ${currentIndex === index
                                    ? "bg-blue-500"
                                    : "bg-gray-300"
                                    }`}
                            ></button>
                        ))}
                    </div> */}
                </div>
            )}
        </div>

    );
};

export default Ghibli;