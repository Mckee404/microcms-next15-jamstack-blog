import Image from 'next/image';
// import Link from 'next/link';
import React from 'react';


export default async function Home() {
  return (
    <main className='sm:container mx-auto px-8 sm:p-0 prose'>
      <div className="profile mx-auto flex flex-col items-center justify-center text-center bg-neutral-100" style={{
        background: 'linear-gradient(135deg, #e5e5e5 0 100%), repeating-linear-gradient(45deg, #e5e5e5 0px 3px, transparent 3px 6px)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'calc(100% - 0.5rem) calc(100% - 0.5rem)',
        backgroundPosition: '0 0, 0.5rem 0.5rem',
      }}>
        <img src="../icon.svg" className="h-32 mb-2" />
        <h2 className="mt-0">Mckee</h2>
      </div>

      <div className="mx-auto w-full sm:w-2/3">
        <h3 className="text-3xl font-bold mb-2">About Me</h3>
        <p className="text-lg text-muted-foreground">
          はじめまして、Mckee(マッキー)です。
        </p>
        <ul>
          <li>筑波大学理工学群</li>
          <li>モバイルアプリ開発（アルバイト・Flutter）</li>
          <li>少食</li>
        </ul>
      </div>

      <div className="mx-auto w-full sm:w-2/3">
        <h3 className="text-3xl font-bold mb-2">技術スタック</h3>
        <p>まだまだ勉強中...</p>
        <AboutPage />
      </div>

      <div className="mx-auto w-full sm:w-2/3">
        <h3 className="text-3xl font-bold mb-2">制作物</h3>
        <ul>
          <li>
            <a href="/" target="_blank" rel="noopener noreferrer">技術ブログ( microCMS + Next.js + CloudflarePages )</a>
          </li>
        </ul>
      </div>
    </main>
  );
}

async function AboutPage() {
  const skills = [
    {
      name: "Flutter",
      icon: "/icons/flutter.svg", // skill-iconsのアイコンパス
      tag: "flutter",
    },
    {
      name: "React",
      icon: "/icons/react.svg",
      tag: "react",
    },
    {
      name: "Git",
      icon: "/icons/git.svg",
      tag: "git",
    },
    {
      name: "Docker",
      icon: "/icons/docker.svg",
      tag: "docker",
    },
    {
      name: "Arduino",
      icon: "/icons/arduino.svg",
      tag: "arduino",
    },
    {
      name: "Go",
      icon: "/icons/golang.svg",
      tag: "golang",
    }
  ];

  return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-8 s:mx-0">
          {skills.map((skill) => (
            <li
              key={skill.name}
              className="flex items-center gap-4 border rounded-xl p-0 "
            >
              {/* アイコン */}
              <div className="flex-shrink-0">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={48}
                  height={48}
                  className='m-0 rounded-xl'
                  style={{
                    boxShadow: '4px 0 6px -1px rgba(0, 0, 0, 0.1), 3px 0 4px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </div>
              {/* 技術名とリンク */}
              <div>
                <h4 className="text-xl font-semibold m-0">{skill.name}</h4>
              </div>
            </li>
          ))}
        </ul>
  );
}