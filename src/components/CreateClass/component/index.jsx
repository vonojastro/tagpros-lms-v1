import React from 'react';
import { ClassMaintenance } from './ClassMaintenance';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import { useLocation } from 'react-router-dom';
import {LightTheme, BaseProvider, ThemeProvider, createTheme, darkThemePrimitives} from 'baseui';
import { useSelector } from "react-redux";


const engine = new Styletron()

export default function CreateClass() {
  const location = useLocation();

  const { email, accountNumber } = useSelector((state) => state.auth.user ? state.auth.user : {});

    return (
      <React.Fragment>
        <StyletronProvider value={engine} >
        <BaseProvider theme={LightTheme}>
          <ThemeProvider theme={createTheme(darkThemePrimitives, {
        colors: {
          borderFocus: "#007bff",
          contentPrimary: "#000",
          inputFill: "#fff",
          inputFillActive: "#fff",
          menuFill: "#fff",
          inputBorder: "#495057",
          borderWidth: '.5px',
          borderStyle: 'solid',
          borderColor: 'hsla(0, 0%, 0%, 0.08)'
        }
      })}>
              <ClassMaintenance email= {email} classDetails={location.state?.classDetails} accountNumber={accountNumber}/>               
          </ThemeProvider>
        </BaseProvider>
        </StyletronProvider>
      </React.Fragment>
    );
  }