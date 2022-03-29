import { ReactNode } from 'react';

import '../styles/search.css';

export default function Banner({ children }: { children: ReactNode }) {
  return (
    <section id="jumbo">
      <div className="jumbo-header">
        <h1>Let's Drive</h1>
        <p>Билеты на автобус по России, Беларуси и Европе</p>
      </div>
      {children}
      <img src="images/vector/bus-min.svg" alt="" />
    </section>
  );
}
