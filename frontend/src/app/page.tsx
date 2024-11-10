"use client";
import ScreenWrapper from "@/components/ScreenWrapper";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full">

      <ScreenWrapper >

        <Navbar />
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-center w-full">
            {/* Hero section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-r from-primary-orange to-primary-yellow">
              <div className="mx-auto max-w-7xl px-6 pb-24 pt-6 sm:pb-32 lg:flex lg:px-8 lg:py-36">
                <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-0">
                  <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    Waaban - Lighting the Path to Wellness
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-white">
                    Designed to address the unique challenges faced by remote and small communities, Waaban ensures that everyone no matter where they are has access to essential health guidance and resources. By leveraging AI-powered technology and community-focused care, Waaban brings personalized health support and public health management tools to underserved regions such as villages and remote areas.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <a
                      href="/admin"
                      className="rounded-md bg-white bg-opacity-25 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-purple/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Get started
                    </a>
                    <a href="/documentation" className="text-sm  font-semibold leading-6 text-white">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                  <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                    <img
                      src="/assets/img/waaban.png"
                      alt="Hospital Dashboard Preview"
                      className="w-[26rem] rounded-md -rotate-12 ring-white/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScreenWrapper >
    </div >
  );
}
