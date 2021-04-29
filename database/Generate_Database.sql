-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema twitter
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `twitter` ;

-- -----------------------------------------------------
-- Schema twitter
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `twitter` DEFAULT CHARACTER SET utf8 ;
USE `twitter` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `UID` INT NOT NULL,
  `ufn` VARCHAR(45) NOT NULL,
  `uln` VARCHAR(45) NOT NULL,
  `u_handle` VARCHAR(45) NOT NULL,
  `u_pass_hash` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`UID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tweet`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tweet` ;

CREATE TABLE IF NOT EXISTS `tweet` (
  `TID` INT NOT NULL,
  `author_UID` INT NOT NULL,
  `text` VARCHAR(45) NOT NULL,
  `created_time` DATETIME NOT NULL,
  `response_tweet_TID` INT NULL,
  `response_tweet_author_UID` INT NULL,
  PRIMARY KEY (`TID`, `author_UID`),
  INDEX `fk_tweet_user_idx` (`author_UID` ASC) VISIBLE,
  INDEX `fk_tweet_tweet1_idx` (`response_tweet_TID` ASC, `response_tweet_author_UID` ASC) VISIBLE,
  CONSTRAINT `fk_tweet_user`
    FOREIGN KEY (`author_UID`)
    REFERENCES `user` (`UID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tweet_tweet1`
    FOREIGN KEY (`response_tweet_TID` , `response_tweet_author_UID`)
    REFERENCES `tweet` (`TID` , `author_UID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `following`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `following` ;

CREATE TABLE IF NOT EXISTS `following` (
  `followie_UID` INT NOT NULL,
  `follower_UID` INT NOT NULL,
  PRIMARY KEY (`followie_UID`, `follower_UID`),
  INDEX `fk_user_has_user_user2_idx` (`follower_UID` ASC) VISIBLE,
  INDEX `fk_user_has_user_user1_idx` (`followie_UID` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_user_user1`
    FOREIGN KEY (`followie_UID`)
    REFERENCES `user` (`UID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_user_user2`
    FOREIGN KEY (`follower_UID`)
    REFERENCES `user` (`UID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `repost`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `repost` ;

CREATE TABLE IF NOT EXISTS `repost` (
  `user_UID` INT NOT NULL,
  `tweet_TID` INT NOT NULL,
  `tweet_author_UID` INT NOT NULL,
  `when` DATETIME NOT NULL,
  PRIMARY KEY (`user_UID`, `tweet_TID`, `tweet_author_UID`, `when`),
  INDEX `fk_user_has_tweet_tweet1_idx` (`tweet_TID` ASC, `tweet_author_UID` ASC) VISIBLE,
  INDEX `fk_user_has_tweet_user1_idx` (`user_UID` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_tweet_user1`
    FOREIGN KEY (`user_UID`)
    REFERENCES `user` (`UID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_tweet_tweet1`
    FOREIGN KEY (`tweet_TID` , `tweet_author_UID`)
    REFERENCES `tweet` (`TID` , `author_UID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `likes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `likes` ;

CREATE TABLE IF NOT EXISTS `likes` (
  `user_UID` INT NOT NULL,
  `tweet_TID` INT NOT NULL,
  `tweet_author_UID` INT NOT NULL,
  `when` DATETIME NOT NULL,
  PRIMARY KEY (`user_UID`, `tweet_TID`, `tweet_author_UID`, `when`),
  INDEX `fk_user_has_tweet1_tweet1_idx` (`tweet_TID` ASC, `tweet_author_UID` ASC) VISIBLE,
  INDEX `fk_user_has_tweet1_user1_idx` (`user_UID` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_tweet1_user1`
    FOREIGN KEY (`user_UID`)
    REFERENCES `user` (`UID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_tweet1_tweet1`
    FOREIGN KEY (`tweet_TID` , `tweet_author_UID`)
    REFERENCES `tweet` (`TID` , `author_UID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `timeline`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `timeline` ;

CREATE TABLE IF NOT EXISTS `timeline` (
  `user_UID` INT NOT NULL,
  `tweet_TID` INT NOT NULL,
  `tweet_author_UID` INT NOT NULL,
  `when` DATETIME NOT NULL,
  PRIMARY KEY (`user_UID`, `tweet_TID`, `tweet_author_UID`, `when`),
  INDEX `fk_user_has_tweet_tweet2_idx` (`tweet_TID` ASC, `tweet_author_UID` ASC) VISIBLE,
  INDEX `fk_user_has_tweet_user2_idx` (`user_UID` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_tweet_user2`
    FOREIGN KEY (`user_UID`)
    REFERENCES `user` (`UID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_tweet_tweet2`
    FOREIGN KEY (`tweet_TID` , `tweet_author_UID`)
    REFERENCES `tweet` (`TID` , `author_UID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
