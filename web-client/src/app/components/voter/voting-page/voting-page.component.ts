import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserAuthService } from '../../../services/auth/users/user-auth.service';
import { VoterService } from '../../../services/voter/voter.service';

@Component({
  selector: 'app-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.css']
})
export class VotingPageComponent implements OnInit {

	candidates: Array<any>;
	current_user: object;
	tokens: any;
	title: any;
	selectedValue: any;
	selectedVote: any;
  remainingTokens: any;

  constructor(
  	private router: Router,
  	private userAuthService: UserAuthService,
  	private voterService: VoterService) { }

  ngOnInit() {
  	this.voterService.getAllCandidates().subscribe(dataFromServer => {
  		this.candidates = dataFromServer;
  		console.log(this.candidates);
  	},
  	err =>{
  		console.log(err);
  		return false;
  	});

  	this.voterService.getProfile().subscribe(dataFromServer => {
  		this.current_user = dataFromServer.user;
      this.remainingTokens = dataFromServer.user.VotingTokens;
  	},
  	err =>{
  		console.log(err);
  		return false;
  	});
  	this.title = 'HELLO';

  }

  voteSubmit(){
    var candidateToVote = {
      votes: this.selectedVote,
      cid: this.selectedValue
    }

  	this.voterService.submitVote(candidateToVote).subscribe(data => {
      if (data.success) {
        console.log(this.candidates);
        this.remainingTokens = this.remainingTokens - candidateToVote.votes;
        console.log("Remaining tokens: "+ this.remainingTokens);
        for (var i = 0; i < this.candidates.length; ++i) {
          if (this.candidates[i]._id === candidateToVote.cid){
            this.candidates[i].totalVotes += candidateToVote.votes;
          }
        }
      } else {
        console.log("##########332211");
        console.log(data);
      }
    })
  }
}
