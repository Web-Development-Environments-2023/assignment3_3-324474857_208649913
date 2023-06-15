<template>
    <div class="container">
      <h1 class="mt-4">About Us</h1>
      <b-row>
        <b-col md="6">
          <h2 class="mt-4">Flavor Fiesta Website</h2>
          <p>Welcome to our Flavor Fiesta Website! </p>
        </b-col>
      </b-row>
      
      <b-row>
        <b-col md="6">
          <h2 class="mt-4">Our Team</h2>
          <b-list-group>
            <b-list-group-item v-for="member in teamMembers" :key="member.id">
              <h3>{{ member.name }}</h3>
              <p>{{ member.role }}</p>
              <p>{{ member.description }}</p>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
      
      <b-row>
        <b-col md="6">
          <h2 class="mt-4">Previous Projects</h2>
          <b-list-group>
            <b-list-group-item v-for="project in previousProjects" :key="project.id">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <b-button :href="project.link" target="_blank" variant="primary">Go To Project</b-button>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        teamMembers: [
          {
            id: 1,
            name: "Eithan Markman",
            role: "Full-Stack Developer",
            description: "John is a skilled frontend developer with a passion for creating engaging user interfaces.",
          },
          {
            id: 2,
            name: "Ariel Dawidowicz",
            role: "Full-Stack Developer",
            description: "Jane is an experienced backend developer, proficient in designing efficient server-side architectures.",
          },
        ],
        previousProjects: [
          {
            id: 1,
            title: "Spaceships Attack Game",
            description: "A web game project built by the team. Mainly focused on HTML Canvas element drawing. ",
            link: "https://web-development-environments-2023.github.io/assignment2-208649913_324474857/#",
          },
          {
            id: 2,
            title: "Personal Site - Kareem Abdul Jabbar",
            description: "A personal site about NBA legend Kareem Abdul Jabbar.\n Project created by Eithan, mainly focuces on basic HTML & CSS.",
            link: "https://web-development-environments-2023.github.io/208649913/",
          },
          {
            id: 3,
            title: "Personal Site - ",
            description: "A personal site about NBA legend Kareem Abdul Jabbar.\n Project created by Eithan, mainly focuces on basic HTML & CSS.",
            link: "https://web-development-environments-2023.github.io/208649913/",
          },
        ],
      };
    },
  };
  </script>
  