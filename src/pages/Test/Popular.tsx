import './Popular.scss'
import {useRef, useEffect} from 'react'

export default function App() {
    const cardsRef = useRef(null);
    const imagesRef = useRef([]);
    const backgroundsRef = useRef([]);
    const range = 40;

    const calcValue = (a, b) => ((a / b) * range - range / 2).toFixed(1);

    useEffect(() => {
        let timeout;

        const handleMouseMove = ({x, y}) => {
            if (timeout) {
                window.cancelAnimationFrame(timeout);
            }

            timeout = window.requestAnimationFrame(() => {
                const yValue = calcValue(y, window.innerHeight);
                const xValue = calcValue(x, window.innerWidth);

                cardsRef.current.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;

                imagesRef.current.forEach((image) => {
                    image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
                });

                backgroundsRef.current.forEach((background) => {
                    background.style.backgroundPosition = `${xValue * 0.45}px ${-yValue * 0.45}px`;
                });
            });
        };

        document.addEventListener('mousemove', handleMouseMove, false);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const arr = [
        {
            id: 1,
            img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_mono.png",
            bg: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_monobg.jpg",
            title: "Princess Mononoke",
        },
        {
            id: 2,
            img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_chihiro.png",
            bg: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_spirited.jpg",
            title: "Spirited Away",
        },
        {
            id: 3,
            img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_howlcastle.png",
            bg: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_howlbg.jpg",
            title: "owls Moving Castle",
        },
    ]

    return (
        <div className="cards" ref={cardsRef}>
            {arr.map((item, idx) => (
                <div className={`card card__${idx + 1}`} key={item.id}>
                    <div className="card__bg" style={{background: `url(${item.bg})`}}
                         ref={(el) => (backgroundsRef.current[idx] = el)}></div>
                    <img className="card__img" ref={(el) => (imagesRef.current[idx] = el)}
                         src={item.img}/>
                    <div className="card__text">
                        <p className="card__title">{item.title}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}