import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
// import { Banner } from '../templates/Banner';
// import { Footer } from '../templates/Footer';
// import { Hero } from '../templates/Hero';
// import { Sponsors } from '../templates/Sponsors';
// import { VerticalFeatures } from '../templates/VerticalFeatures';
// import {Input} from "@nextui-org/react";
// import YTComponent from './ISMS';
import ISMS from './ISMS';

const Base = () => (
  <div className="text-gray-600 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    
    <div className="flex w-full flex-col">
     <ISMS />
     
    </div>  
    
  </div>
);

export { Base };
