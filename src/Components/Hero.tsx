import {Typography} from '@material-ui/core';
import React from 'react';
import './Hero.css';

interface IHeroProps {
  logos: string[];
  welcome: string;
}

function Anchor(props: React.HTMLProps<HTMLAnchorElement>) {
  return <a href={props.href}>{props.value}</a>;
}

const Hero: React.FunctionComponent<IHeroProps> = (props) => {
  return (
    <header className="App-header">

      <Typography variant="h5">{props.welcome}</Typography>
      
      <Typography variant="body1">
        Edit{' '}
        <b>
          <code>src/App.tsx</code>
        </b>{' '}
        and save to reload.
      </Typography>

      <Typography variant="subtitle1" component="h6">
        Essential Links
      </Typography>
      <ul>
        <li>
          <Anchor
            href="https://docs.coveo.com/en/headless"
            value="Coveo Headless documentation"
          />
        </li>
        <li>
          <Anchor href="https://reactjs.org" value="React documentation" />
        </li>
        <li>
          <Anchor
            href="https://material-ui.com/"
            value="Material-ui Documentation"
          />
        </li>
      </ul>
    </header>
  );
};

export default Hero;
