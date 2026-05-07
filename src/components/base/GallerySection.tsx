import { theme } from '../../themes'
import config from '../../config'

export default function GallerySection() {
    return (
        <section
            id="gallery"
            className="py-20 px-4"
            style={{ backgroundColor: theme.bgPrimary }}
        >
            <div className="max-w-5xl mx-auto">
                <h2
                    className="text-3xl font-bold text-center mb-12"
                    style={{ color: theme.accent }}
                >
                    Galeria
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {config.gallery.map((image, index) => (
                        <div
                            key={index}
                            className="rounded-xl overflow-hidden aspect-square"
                            style={{ backgroundColor: theme.bgCard }}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                onError={e => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/FAF7F5/C084A0?text=Manicure'
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
