<template>
  <div>
    <table class="table-auto w-9/12 mx-auto">
      <tr class="">
        <th>Team Name</th>
        <th># of Members</th>
      </tr>
      <tr v-for="team in teams" :key="team.id">
        <td>{{ team.name }}</td>
        <td>{{ team.members }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Team',
  data() {
    return {
      teams: [
        {
          name: 'Tabula Rasa eSports',
          members: 8,
        },
        {
          name: 'Absolute Sim Racing',
          members: 15,
        },
        {
          name: 'Hendrick Motorsports',
          members: 3,
        }
      ]
    }
  }
}
</script>

<style scoped>
  .team {
    display: flex;
    flex-direction: row;
  }
</style>