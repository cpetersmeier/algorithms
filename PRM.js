class PRM extends Graph{
    constructor(){
        super();
        this.q_init;
        this.q_goal;
    }

    generate(K, N, q_init, q_goal){
        // K = number of nodes to put in the roadmap
        // N = number of closest neighbors to examine for each configuration

        this.q_init = q_init;
        this.q_goal = q_goal;

        let i = 0;
        while(i < K){

            let q_rand = this.sampleRandomConfiguration(0.9);
                // @param: area_offset: [0;1] size of canvas area to use

            // console.log("q_rand(x,y) = ", q_rand.getX(), ", ", q_rand.getY());
            this.add_vertex(q_rand);
            i++;
        }

        for(let [global_key, global_value] of this.graph){
            var tmp = this.nearestVertices(global_key, N);

            for(i = 0; i < tmp.length; i++){
                this.addEdge(global_key, tmp[i]);
            }
        }

        // connect start point to the graph

        let nearestVertexToQStart = this.nearest_vertex(this.q_init);
        this.add_vertex(this.q_init);
        this.addEdge(this.q_init, nearestVertexToQStart);

        let nearestVertexToQGoal = this.nearest_vertex(this.q_goal);
        this.add_vertex(this.q_goal);
        this.addEdge(this.q_goal, nearestVertexToQGoal);
    }



}