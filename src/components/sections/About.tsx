const About = () => {
    return (
        <div className="about text-white overflow-hidden" id="about">
            <div className="container mx-auto">
                <div className="flex flex-col pt-5 lg:pt-0 lg:flex-row items-center justify-center gap-10">
                    <div className="w-2/3 lg:w-1/3 ">
                        <h2 className="title-1">Пара слов о нас</h2>
                        <p className="py-4">Спорт держит нас в форме. Учит дисциплине. Объединяет нас. Через спорт мы можем
                            менять жизни. В том числе с помощью воодушевляющих историй спортсменов. Чтобы помочь тебе
                            подняться и двигаться вперед.
                        </p>
                        <div className="text-xl font-bold flex justify-end items-center gap-3">
                            <span className="about-content-descr--line"></span>
                            <p>SneakMax</p>
                        </div>
                    </div>

                    <picture>
                        <img src="img/about/shooth.png" alt="" />
                    </picture>
                </div>
            </div>
        </div>
    );
}

export default About;