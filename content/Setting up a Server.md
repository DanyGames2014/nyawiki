In this guide you will learn how to setup a server for StationAPI on Babric.

### 1. Getting Java 17
If you already have Java 17 you can skip this step, if not then you can head to https://www.azul.com/downloads/?version=java-17-lts&package=jdk#zulu and download Java for your applicable platform.   

>[!info] On Windows you have a choice between `.msi` and `.zip`, you will probably want to choose `.msi` which is an installer, the `.zip` is a portable install.

### 2. Downloading Babric
Now that you have Java 17 installed you can head over to https://babric.github.io/use/server/ and grab an executable server jar. The default settings should be fine.  
Now that you've downloaded Babric, let's create a folder for the server and move the jar over there. I also recommend to give it a more workable name, something like `server.jar` will do just fine.

### 3. Downloading StationAPI
You will want to grab the latest release of StationAPI from https://modrinth.com/mod/stationapi/versions. Once you have the jar downloaded, create a `mods` in you server folder and drag the jar into there

### 4. Starting the server
To start the server you need to execute the server jar from command line. Here is a short batch script to make it a bit easier, make sure to save it with the `.bat` extension to make it executable. 
```batch
@echo off

:: Config ::
:: Memory (Java Arg format ex. 4G OR 4096M) ::
set mem=2G
:: Java Path ::
set java="C:\Program Files\Zulu\zulu-17\bin\java"
:: Window Title ::
set name=Babric Server
:: JAR Name ::
set jarname=server.jar

:: You shouldn't need to modify anything below this ::
:: Set Window Title
title %name%

:StartServer
%java% -server -Xmx%mem% -Xms%mem% -jar %jarname% nogui
echo Server Closed/Crashed on %time%
echo Restarting... Press Ctrl+C to Terminate
timeout /t 30
goto StartServer
```
Once you execute the batch file the server should now start. If you want to see the Minecraft Server GUI you can remove the `nogui` argument from the end of line 18.

>[!warning] Since the Auth servers are still not restored at the time of writing \[04/2024\], you will need to either disable online-mode in `server.properties` or install [MojangFix](https://modrinth.com/mod/mojangfix-stationapi-edition) on both client and server, which will fix the auth system.
