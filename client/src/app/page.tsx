"use client";

import Header from "@/common/header";
import { Button } from "react-bootstrap";

export default function Home() {
  return <main>

    <Header></Header>

    <div className="to_center border_2px main_white_color">
      <h3>Egyik félév</h3>
    </div>
    <div className="flex_container border_1px">
      <div className="flex_child main_white_color">
        <p>Adott tárgy előadás</p>
        <p>előadás kódja</p>
      </div>
      <div className="flex_child">
        <Button variant="primary">Fórum</Button>{' '}
        <Button variant="primary">Hirdetmények</Button>{' '}
      </div>
      <div className="flex_child">
        <Button variant="primary">Jegy beírása</Button>{' '}
        <Button href="/teacher/exams" variant="primary">Vizsga kiírása</Button>{' '}
      </div>
    </div>

    <div className="flex_container border_1px">
      <div className="flex_child main_white_color">
        <p>Adott tárgy gyakorlat összevont színtér</p>
        <p>gyakorlat kódja</p>
      </div>
      <div className="flex_child">
        <Button variant="primary">Fórum</Button>{' '}
        <Button variant="primary">Hirdetmények</Button>{' '}
      </div>
    </div>

    <div className="flex_container bottom_border">
      <div className="flex_child main_white_color margin_left">
        <p>Adott tárgy gyakorlat</p>
      </div>
      <div className="flex_child">
        <Button variant="primary">Fórum</Button>{' '}
        <Button variant="primary">Hirdetmények</Button>{' '}
      </div>
      <div className="flex_child">
        <Button variant="primary">Jegy beírása</Button>{' '}
      </div>
    </div>


  </main>
}