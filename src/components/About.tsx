import Image from "next/image";

export const About = () => {
  return (
    <section
      id="about"
      className="pb-16 pt-24 sm:pb-24 sm:pt-32 xl:pb-32 xl:scroll-mt-5 scroll-mt-10"
    >
      <div className="bg-muted pb-20 sm:pb-24 xl:pb-0">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8 flex flex-col items-center gap-x-8 gap-y-10 sm:gap-y-8 xl:flex-row xl:items-stretch">
          <div className="-mt-8 w-full max-w-2xl xl:h-[460px] xl:-mb-8 xl:w-96 xl:flex-none">
            <div className="relative aspect-square h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
              <Image
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXQlMjBmZW1tZXxlbnwwfHwwfHx8MA%3D%3D"
                className="absolute inset-0 size-full rounded-2xl bg-card-foreground object-cover shadow-2xl"
                loading="lazy"
                fill
                alt="marie picture"
              />
            </div>
          </div>
          <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-2">
            <figure className="relative isolate pt-6 sm:pt-12">
              <blockquote className="text-xl font-semibold leading-8 sm:text-2xl sm:leading-9">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque ac tellus placerat, malesuada erat fermentum,
                rhoncus sem. Proin placerat tortor ut dui ultricies dapibus.
                Maecenas mollis ex ut dolor congue sollicitudin. Nulla dolor
                augue, ultricies vitae ligula ut, auctor blandit nulla. Aliquam
                eu quam massa.
              </blockquote>
              <figcaption className="mt-8 text-base">
                <p className="font-semibold">Maria Rosaria</p>
                <p className="mt-1 text-muted-foreground">
                  Créatrice de bougie fait maison
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
