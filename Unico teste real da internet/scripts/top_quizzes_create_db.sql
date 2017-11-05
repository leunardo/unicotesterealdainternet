drop database if exists db_topquizzes;
create database db_topquizzes;
use db_topquizzes;

create table usuario
(
	id_usuario 			   bigint unsigned not null auto_increment,
    id_google varchar(255)                         unique not null,
    nome varchar(255) 								      not null,
    descricao varchar(255) 								  not null,
	url_foto varchar(255)								  not null,
    pontuacao bigint									  not null,
    primary key(id_usuario)
);

create table modalidade
(
	id_modalidade bigint unsigned not null auto_increment,
    nome varchar(255)                   not null,
    primary key (id_modalidade)
);

create table quiz 
(
	id_quiz bigint                 unsigned not null auto_increment,
    id_usuario bigint                             unsigned not null,
    id_modalidade bigint 				          unsigned not null,
    titulo varchar(255)					         	       not null,
    resumo varchar(255)					          		   not null,
    url_foto varchar(255)                                  not null,
    primary key(id_quiz)                                           ,
    foreign key(id_usuario) references usuario(id_usuario)         ,
    foreign key(id_modalidade) references modalidade(id_modalidade)    
);

create table top3
(
	id_top3 bigint unsigned not null auto_increment,
    id_usuario bigint unsigned not null,
    id_quiz bigint unsigned not null,
    posicao smallint,
    pontuacao int not null,
    primary key (id_top3),
    foreign key (id_usuario) references usuario(id_usuario),
    foreign key (id_quiz) references quiz(id_quiz)
);

create table pergunta
(
	id_pergunta bigint unsigned not null auto_increment,
    id_quiz bigint 					  unsigned not null,
    descricao varchar(255) 					   not null,
    primary key (id_pergunta)
);

create table resposta
(
	id_resposta bigint 		unsigned not null auto_increment,
    id_pergunta bigint   				   unsigned not null,
    texto varchar(255) 								not null,
    nota bigint												,
    primary key(id_resposta)								,
    foreign key(id_pergunta) references pergunta(id_pergunta)
);

create table tag(
	id_tag bigint unsigned not null auto_increment,
    tag varchar(255) unique not null,
    primary key(id_tag)
);

create table quiztags(
	id_relacao bigint unsigned not null auto_increment,
    id_quiz bigint unsigned not null,
    id_tag bigint unsigned not null,
    primary key(id_relacao),
    foreign key(id_quiz) references quiz(id_quiz),
    foreign key(id_tag) references tag(id_tag)
);

create table userquizzes(
    id_userquiz bigint unsigned not null auto_increment,
    id_quiz bigint unsigned not null,
    id_user bigint unsigned not null,
    primary key(id_userquiz),
    foreign key(id_quiz) references quiz(id_quiz),
    foreign key(id_user) references usuario(id_usuario)
);

create table resultado(
	id_resultado bigint unsigned not null auto_increment,
    id_quiz bigint unsigned not null,
    resultado varchar(255) not null,
    pontuacaoMin int unsigned not null,
    pontuacaoMax int unsigned not null,
    primary key (id_resultado),
    foreign key (id_quiz) references quiz(id_quiz)
    );

create table friendship(
	id_friendship bigint unsigned not null auto_increment,
    id_user bigint unsigned not null,
    id_user2 bigint unsigned not null,
    pendente boolean not null default true,
    primary key(id_friendship),
    foreign key(id_user) references usuario(id_usuario),
    foreign key(id_user2) references usuario(id_usuario),
    constraint id_friendship unique(id_user, id_user2)
);