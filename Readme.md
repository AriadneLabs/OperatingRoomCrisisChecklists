# Operating Room Crisis Checklists 

## Introduction

The Operating Room Crisis Checklists have been designed and implemented as a responsive web-application, built with Svelte. This is a good option for organizations interested in implementing customized versions of the standard checklists as a responsive, mobile-friendly website. This repo can be used in addition to this [guide](https://www.ariadnelabs.org/wp-content/uploads/2023/10/IT-Hosting-guide-for-ORCC.pdf) for hosting Operating Room Crisis Checklists.

## Tech stack

* Languages- Web technologies (Svelte, HTML, CSS, Javascript)
* Docker
* Vagrant

## Folder details

```
| -- ORCC2
        | -- orcc_2_0 (UI built using Svelte)                          
```

## Installation requirements

### Option 1

* Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads) and [Vagrant](https://www.vagrantup.com/downloads.html)
* Clone this repo
* Commands
    * `$ vagrant up`
    * `$ vagrant ssh`
    * cd to project directory
        * `$ cd OperatingRoomCrisisChecklists`
    * Build and run the images using docker compose
        * Build using docker compose
            * `$ docker-compose build`
        * Run!
            * `$ docker-compose up`
    * [Access ORCC 2](http://192.168.33.20:8080)
    * If using Chrome for dev, might need to enable chrome flag for [insecure origin to be treated as secure](chrome://flags/#unsafely-treat-insecure-origin-as-secure). Add URL http://192.168.33.20:8080 as origin.

### Option 2

* Install [Docker](https://docs.docker.com/get-docker/) 
* Clone this repo
* Commands    
    * cd to project directory
        * `$ cd OperatingRoomCrisisChecklists`
    * Build and run the images using docker compose
        * Build using docker compose
            * `$ docker-compose build`
        * Run!
            * `$ docker-compose up`
    * [Access OrCC 2.0](http://0.0.0.0:8080)
    * If using Chrome for dev, might need to enable chrome flag for [insecure origin to be treated as secure](chrome://flags/#unsafely-treat-insecure-origin-as-secure). Add URL http://0.0.0.0:8080 as origin.

## File structure and steps to modify

### Project File Structure

The checklists are implemented as separate svelte files with corresponding javascript files. The svelte
files define primarily the layout and rendering of the checklists, while the javascript files define the
content of each checklist.

Svelte files: The svelte files live in the “pages” folder within the “src” folder. The code is largely the
same across checklists with minor variations. One additional svelte file
(src/components/reference_section.svelte) defines the ReferenceSection component, which contains
the layout and styling for the reference boxes across the checklists.

Javascript files: The javascript files live in the “models” folder within the “src” folder. Each javascript
file is organized into a page object, stepSets object, and references object. The page object contains
the checklist header information (index number, title, etc…), the stepSets object contains all the steps
on the checklist and the associated substeps, and the references object contains the contents of the
reference boxes (drug dosing, differential diagnosis, etc…).

### Modifying the checklists

The checklists have been intentionally designed for ease of use in crisis situations, and as such, we
strongly advise limiting modifications to critical content changes. **Most text revisions to the
checklists can be addressed by directly updating the data values defined in the javascript files.
Please use extreme caution in entering data, especially drug information, because errors can
endanger patients.**

1. Open the project directory and navigate to orcc_2_0/src/models/ which is the directory
containing the javascript files. There are 17 javascript files, one for each checklist.
2. Open the javascript file of the checklist requiring edits.
3. Search for the text to edit, edit, and save.

## Hosting recommendation

Since the repo has been provided with docker and docker compose files, we recommend using any of the popular container services from cloud providers (AWS/Azure/GCP) for hosting the application. 
