import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
// import { Banner } from '../templates/Banner';
// import { Footer } from '../templates/Footer';
// import { Hero } from '../templates/Hero';
// import { Sponsors } from '../templates/Sponsors';
// import { VerticalFeatures } from '../templates/VerticalFeatures';
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
// import {Input} from "@nextui-org/react";
// import YTComponent from './ISMS';
import ISMS from './ISMS';

const Base = () => (
  <div className="text-gray-600 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    
    <div className="flex w-full flex-col">
     <ISMS />
      <Tabs size={'lg'} fullWidth= {true} aria-label="Options">
        <Tab key="photos" title="Photos">
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="music" title="Music">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="videos" title="Videos">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </div>  
    
  </div>
);

export { Base };
